"use client";

import { useState } from "react";
import QuoteCalculator from "../../components/QuoteCalculator";
import FileUploader from "../../components/FileUploader";

type Step = 1 | 2 | 3 | 4;

export default function BookingPage() {
  const [step, setStep] = useState<Step>(1);

  return (
    <main className="ocean-container ocean-section-padding">
      <h1 className="text-ocean-h1 mb-2">Book a Shipment</h1>
      <p className="text-ocean-body mb-8">Follow the steps to schedule pickup and confirm your shipment.</p>

      <div className="ocean-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="text-ocean-small">Step {step} of 4</div>
            <div className="h-2 rounded bg-[var(--professional-border)] mt-1">
              <div className="h-2 rounded bg-[var(--ocean-deep)]" style={{ width: `${(step/4)*100}%` }} aria-hidden />
            </div>
          </div>
          <div className="ml-4 flex gap-2">
            {step > 1 && <button className="btn-ocean-secondary" onClick={() => setStep((s) => (s - 1) as Step)}>Back</button>}
            {step < 4 && <button className="btn-ocean-primary" onClick={() => setStep((s) => (s + 1) as Step)}>Next</button>}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {step === 1 && (
            <>
              <div>
                <h3 className="text-ocean-h3 mb-3">Sender Details</h3>
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input className="ocean-input" placeholder="Name" />
                  <input className="ocean-input" placeholder="Phone" />
                  <input className="ocean-input sm:col-span-2" placeholder="Address" />
                  <input className="ocean-input" placeholder="City" />
                  <input className="ocean-input" placeholder="Postal Code" />
                </form>
              </div>
              <div>
                <h3 className="text-ocean-h3 mb-3">Recipient Details</h3>
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input className="ocean-input" placeholder="Name" />
                  <input className="ocean-input" placeholder="Phone" />
                  <input className="ocean-input sm:col-span-2" placeholder="Address" />
                  <input className="ocean-input" placeholder="City" />
                  <input className="ocean-input" placeholder="Postal Code" />
                </form>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <h3 className="text-ocean-h3 mb-3">Package Details</h3>
                <form className="grid grid-cols-3 gap-3">
                  <input className="ocean-input" placeholder="Weight (kg)" />
                  <input className="ocean-input" placeholder="Length (cm)" />
                  <input className="ocean-input" placeholder="Width (cm)" />
                  <input className="ocean-input" placeholder="Height (cm)" />
                  <select className="ocean-input col-span-2">
                    <option>Standard</option>
                    <option>Express</option>
                    <option>Freight</option>
                  </select>
                </form>
              </div>
              <div>
                <h3 className="text-ocean-h3 mb-3">Cost Estimate</h3>
                <QuoteCalculator />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <h3 className="text-ocean-h3 mb-3">Upload Documents</h3>
                <FileUploader />
              </div>
              <div>
                <h3 className="text-ocean-h3 mb-3">Pickup Schedule</h3>
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input type="date" className="ocean-input" />
                  <input type="time" className="ocean-input" />
                  <select className="ocean-input sm:col-span-2">
                    <option>Anytime</option>
                    <option>09:00 - 12:00</option>
                    <option>12:00 - 15:00</option>
                    <option>15:00 - 18:00</option>
                  </select>
                </form>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div>
                <h3 className="text-ocean-h3 mb-3">Review & Confirm</h3>
                <ul className="text-ocean-small space-y-1">
                  <li>• Sender and recipient details</li>
                  <li>• Package dimensions and weight</li>
                  <li>• Selected service and pricing</li>
                  <li>• Scheduled pickup</li>
                </ul>
              </div>
              <div className="flex items-end">
                <button className="btn-ocean-primary">Confirm Booking</button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
