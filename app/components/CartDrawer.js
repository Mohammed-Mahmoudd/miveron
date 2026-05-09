"use client";

import { useCart } from "../context/CartContext";
import styles from "./CartDrawer.module.css";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice } =
    useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Your Bag</h2>
          <button
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
            aria-label="Close cart"
            id="close-cart"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </div>
            <p className={styles.emptyText}>Nothing here yet.</p>
            <p className={styles.emptySubtext}>
              Your bag is empty — time to change that.
            </p>
          </div>
        ) : (
          <>
            <div className={styles.itemsList}>
              {items.map((item) => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.itemImage}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className={styles.itemImagePhoto}
                    />
                  </div>
                  <div className={styles.itemDetails}>
                    <div className={styles.itemTop}>
                      <div>
                        <p className={styles.itemName}>{item.name}</p>
                        <p className={styles.itemColor}>{item.color}</p>
                      </div>
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                    <div className={styles.itemBottom}>
                      <div className={styles.qtyControls}>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className={styles.qtyBtn}
                        >
                          −
                        </button>
                        <span className={styles.qtyValue}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className={styles.qtyBtn}
                        >
                          +
                        </button>
                      </div>
                      <p className={styles.itemPrice}>
                        EGP {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalPrice}>
                  EGP {totalPrice.toLocaleString()}
                </span>
              </div>
              <button className={styles.checkoutBtn} id="checkout-button">
                Checkout
              </button>
              <p className={styles.shippingNote}>
                Shipping calculated at checkout
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
