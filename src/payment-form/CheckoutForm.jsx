import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
// import usePropertyBought from "../../Hooks/usePropertyBought";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { FaCheck } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const stripe = useStripe(); // str
  const elements = useElements(); // str
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState(""); // str
  const [transjectionId, setTransjectionId] = useState(""); // str
  const navigate = useNavigate();

  const item = useLoaderData();
  console.log(item);
  const OfferedPrice = item[0].OfferedPrice;
  const PropertieTitle = item[0].PropertieTitle;
  const agentEmail = item[0].agentEmail;
  const location = item[0].location;
  const paymentId = item[0]._id;
  console.log(agentEmail);

  useEffect(() => {
    if (OfferedPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { OfferedPrice })
        .then((res) => {
          // console.log(res.data.clientSecret)
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, OfferedPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // Confirm Payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: currentUser?.email || "anonymous",
            name: currentUser?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log(paymentIntent, "payment intend");
      if (paymentIntent.status === "succeeded") {
        setTransjectionId(paymentIntent.id);

        // Now save the payment in the database
        const payment = {
          buyeremail: currentUser.email,
          buyername: currentUser.displayName,
          paymentId,
          OfferedPrice,
          PropertieTitle,
          transjectionId: paymentIntent.id,
          location,
          agentEmail,
        };
        console.log(payment);
        const res = await axiosSecure.post("/payments", payment);
        console.log(res.data);
        if (res.data?.result.insertedId) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your Payment Has been completed",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/Dashboard/userHome");
        }
      }
    }
  };

  return (
    <div>
      <form className="max-w-6xl mx-auto" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#000",
                "::placeholder": {
                  color: "#000",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-accent mt-5"
          type="submit"
          disabled={!stripe || !clientSecret}>
          Pay
        </button>
        <p className="text-white font-medium mt-3">
          {error && (
            <span className="flex items-center gap-2">
              <IoWarningOutline />
              {error}
            </span>
          )}
        </p>
        {transjectionId && (
          <p className="text-white flex items-center gap-2">
            {" "}
            <FaCheck /> Your Transjection Id Is {transjectionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
