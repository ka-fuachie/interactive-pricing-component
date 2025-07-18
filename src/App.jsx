// @ts-check
import React, { useState } from 'react'

import './App.css'

export default function App() {
  const [pricingOption, setPricingOption] = useState(DEFAULT_PRICING_OPTION);
  const [isMonthlyBilling, setIsMonthlyBilling] = useState(true);

  const price = (() => {
    if(isMonthlyBilling) return pricingOption.price;
    return pricingOption.price * 0.75;
  })()

  return (
    <div className="pricing">
      <div className="pricing__body">
        <header className="pricing__header">
          <h1 className="pricing__title">Simple, traffic-based pricing</h1>
          <p className="pricing__subtitle">
            <span>Sign-up for our 30 day trial.</span>
            <span>No credit card required.</span>
          </p>
        </header>

        <div className="pricing__content">
          <article className="pricing-card">
            <div className="pricing-card__content">
              <div className="pricing-card__title-section">
                <p className="pricing-card__title">{pricingOption.label}</p>
              </div>

              <div className="pricing-card__price-section">
                <p className="pricing-card__price">
                  <span data-variant="highlight">{formatPrice(price)}</span>
                  <span data-variant="subtle">/ month</span>
                </p>
              </div>

              <div className="pricing-card__slider-section">
                <PricingSlider defaultValue={pricingOption} onChange={setPricingOption} />
              </div>

              <div className="pricing-card__billing-section">
                <div className="pricing-card__billing">
                  <p>Monthly Billing</p>
                  <div>
                    <BillingToggle
                      defaultValue={!isMonthlyBilling}
                      onChange={checked => setIsMonthlyBilling(!checked)}
                    />
                  </div>
                  <p>Yearly Billing <span data-variant="label">25% discount</span> <span data-variant="label mobile">-25%</span></p>
                </div>
              </div>
            </div>

            <footer className="pricing-card__footer">
              <ul className="pricing-card__features-list">
                <li>Unlimited websites</li>
                <li>100% data ownership</li>
                <li>Email reports</li>
              </ul>

              <div>
                <button type="button" className="pricing-card__btn">Start my trial</button>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </div>
  )
}

/**
 * 
 * @param {Object} props
 * @param {PricingOption} [props.defaultValue]
 * @param {(value: PricingOption) => void} [props.onChange]
 * @returns 
 */
function PricingSlider({ defaultValue, onChange }) {
  const [value, setValue] = useState(defaultValue ?? DEFAULT_PRICING_OPTION);

  function handleChange(event) {
    const value = PricingOptions.find(option => (
      option.value === Number(event.target.value)
    ));
    if(value == null) throw new Error("Invalid value");

    setValue(value);
    onChange?.(value);
  }

  return (
    <div
      className="pricing-slider"
      style={{
        // @ts-ignore
        "--range-value": value.value,
        "--range-min": 1,
        "--range-max": PricingOptions.length,
      }}
    >
      <input
        className="pricing-slider__input"
        type="range"
        min={1}
        max={PricingOptions.length}
        value={value.value}
        onChange={handleChange}
      />

      <div className="pricing-slider__track">
        <div className="pricing-slider__range"></div>
      </div>
      <div className="pricing-slider__thumb"></div>
    </div>
  )
}

/**
 * 
 * @param {Object} props
 * @param {boolean} [props.defaultValue]
 * @param {(value: boolean) => void} [props.onChange]
 * @returns 
 */
function BillingToggle({ defaultValue, onChange }) {
  const [value, setValue] = useState(defaultValue ?? false);

  function handleChange(event) {
    setValue(event.target.checked);
    onChange?.(event.target.checked);
  }

  return (
    <div className="billing-toggle">
      <input
        type="checkbox"
        checked={value}
        onChange={handleChange}
        className="billing-toggle__input"
      />

      <div className="billing-toggle__track"></div>
      <div className="billing-toggle__thumb"></div>
    </div>
  )
} 

/** @param {number} price */
function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

const PricingOptions = [
  {
    label: "10K pageviews",
    price: 8,
    value: 1,
  },
  {
    label: "50K pageviews",
    price: 12,
    value: 2,
  },
  {
    label: "100K pageviews",
    price: 16,
    value: 3,
  },
  {
    label: "500k pageviews",
    price: 24,
    value: 4,
  },
  {
    label: "1M pageviews",
    price: 36,
    value: 5,
  },
]

const DEFAULT_PRICING_OPTION = PricingOptions[2]

/** @typedef {typeof PricingOptions[number]} PricingOption */