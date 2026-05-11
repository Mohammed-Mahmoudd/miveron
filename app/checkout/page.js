"use client";

import { useCart } from "../context/CartContext";
import styles from "./checkout.module.css";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef(null);
  const governorates = ["Cairo", "Giza", "Alexandria", "Other"];

  // Load saved address
  useEffect(() => {
    const saved = localStorage.getItem("miveron-checkout-data");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch {}
    }
  }, []);

  // Save on change
  useEffect(() => {
    localStorage.setItem("miveron-checkout-data", JSON.stringify(formData));
  }, [formData]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.governorate) {
      alert("Please select a governorate.");
      return;
    }

    setIsSubmitting(true);
    
    const shipping = 0;
    const finalTotal = totalPrice;

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
      <main className="container">
        <div className={styles.checkoutPage}>
          <div className={styles.emptyState}>
            <h2>Order Confirmed!</h2>
            <p>Thank you, {formData.firstName}. Your order has been placed successfully.</p>
            <p>We will contact you shortly to confirm delivery details.</p>
            
            <div className={styles.actionButtons}>
              <a 
                href="https://wa.me/201501685539?text=Hello,%20I%20would%20like%20to%20track%20my%20recent%20Miveron%20order." 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.whatsappBtn}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                Track via WhatsApp
              </a>
              <Link href="/shop" className={styles.shopBtn}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="container">
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

  const shipping = 0;
  const finalTotal = totalPrice;

  return (
    <main className="container">
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
              <label className={styles.label}>Phone Number (WhatsApp)</label>
              <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className={styles.input} />
            </div>

            <h2 className={styles.sectionTitle} style={{ marginTop: '2rem' }}>Shipping Address</h2>
            
            <div className={styles.inputGroup}>
              <label className={styles.label}>Address</label>
              <input required type="text" name="address" value={formData.address} onChange={handleChange} className={styles.input} />
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>City</label>
                <input required type="text" name="city" value={formData.city} onChange={handleChange} className={styles.input} />
              </div>
              <div className={styles.inputGroup} ref={selectRef}>
                <label className={styles.label}>Governorate</label>
                <div className={styles.customSelect}>
                  <div 
                    className={`${styles.customSelectHeader} ${isSelectOpen ? styles.open : ""} ${!formData.governorate ? styles.placeholder : ""}`}
                    onClick={() => setIsSelectOpen(!isSelectOpen)}
                  >
                    <span>{formData.governorate || "Select Governorate"}</span>
                    <svg className={styles.customSelectIcon} width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="2 2 6 6 10 2"></polyline>
                    </svg>
                  </div>
                  
                  <div className={`${styles.customSelectList} ${isSelectOpen ? styles.open : ""}`}>
                    {governorates.map((gov) => (
                      <div 
                        key={gov} 
                        className={`${styles.customSelectItem} ${formData.governorate === gov ? styles.selected : ""}`}
                        onClick={() => {
                          setFormData({ ...formData, governorate: gov });
                          setIsSelectOpen(false);
                        }}
                      >
                        {gov}
                      </div>
                    ))}
                  </div>
                </div>
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
                <span style={{ color: 'var(--accent, #4ade80)', fontWeight: 600 }}>FREE</span>
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
