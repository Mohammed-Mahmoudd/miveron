"use client";

import { useCart } from "../context/CartContext";
import styles from "./checkout.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    governorate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const shipping = 100;
    const finalTotal = totalPrice + shipping;

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData,
          items,
          totalItems,
          totalPrice,
          shipping,
          finalTotal
        }),
      });

      if (res.ok) {
        setSuccess(true);
        clearCart();
        window.scrollTo(0, 0);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <main className="container section">
        <div className={styles.checkoutPage}>
          <div className={styles.emptyState}>
            <h2>Order Confirmed!</h2>
            <p>Thank you, {formData.firstName}. Your order has been placed successfully.</p>
            <p>We will contact you shortly to confirm delivery details.</p>
            <Link href="/shop" className={styles.shopBtn} style={{ marginTop: '2rem' }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="container section">
        <div className={styles.checkoutPage}>
          <div className={styles.emptyState}>
            <h2>Your Cart is Empty</h2>
            <p>You need to add items to your cart before proceeding to checkout.</p>
            <Link href="/shop" className={styles.shopBtn}>
              Browse Watches
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const shipping = 100; // Fixed shipping for demo
  const finalTotal = totalPrice + shipping;

  return (
    <main className="container section">
      <div className={styles.checkoutPage}>
        <div className={styles.checkoutHeader}>
          <h1 className={styles.title}>Secure Checkout</h1>
        </div>

        <form onSubmit={handleSubmit} className={styles.checkoutGrid}>
          {/* Left Column: Form */}
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Contact Information</h2>
            
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>First Name</label>
                <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Last Name</label>
                <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={styles.input} />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Email Address</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className={styles.input} />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Phone Number</label>
              <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className={styles.input} />
            </div>

            <h2 className={styles.sectionTitle} style={{ marginTop: '2rem' }}>Shipping Address</h2>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>Street Address</label>
              <input required type="text" name="address" value={formData.address} onChange={handleChange} className={styles.input} />
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>City</label>
                <input required type="text" name="city" value={formData.city} onChange={handleChange} className={styles.input} />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Governorate</label>
                <select required name="governorate" value={formData.governorate} onChange={handleChange} className={styles.input}>
                  <option value="">Select Governorate</option>
                  <option value="Cairo">Cairo</option>
                  <option value="Giza">Giza</option>
                  <option value="Alexandria">Alexandria</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className={styles.summarySection}>
            <h2 className={styles.sectionTitle}>Order Summary</h2>
            
            <div className={styles.summaryItems}>
              {items.map((item) => (
                <div key={item.id} className={styles.summaryItem}>
                  {item.images && item.images.length > 0 ? (
                    <img src={item.images[0]} alt={item.name} className={styles.itemImage} />
                  ) : item.image ? (
                     <img src={item.image} alt={item.name} className={styles.itemImage} />
                  ) : (
                    <div className={styles.itemImage} />
                  )}
                  <div className={styles.itemDetails}>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.itemQty}>Qty: {item.quantity}</div>
                    <div className={styles.itemPrice}>EGP {item.price.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.totals}>
              <div className={styles.totalRow}>
                <span>Subtotal ({totalItems} items)</span>
                <span>EGP {totalPrice.toLocaleString()}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Shipping</span>
                <span>EGP {shipping.toLocaleString()}</span>
              </div>
              <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                <span>Total</span>
                <span>EGP {finalTotal.toLocaleString()}</span>
              </div>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Place Order"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
