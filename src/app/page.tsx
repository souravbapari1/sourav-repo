"use client";
import { Button } from "@/components/ui/button";
import { usePrintElement } from "@/logic/hooks/usePrintElement";
import React from "react";

function InvoicePage() {
  const { downloadPdfFile, openPdfFile, pdfRef } = usePrintElement();

  return (
    <div className="p-4 border rounded-md max-w-xl mx-auto">
      <div className="p-5" ref={pdfRef}>
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold">Invoice</h1>
          <p className="text-sm text-gray-600">Invoice #12345</p>
          <p className="text-sm text-gray-600">Date: 12/12/2024</p>
        </header>

        <section className="mb-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">From:</h2>
            <p>Company Name</p>
            <p>123 Main Street</p>
            <p>City, State, ZIP</p>
            <p>Email: contact@company.com</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">To:</h2>
            <p>Client Name</p>
            <p>456 Another St</p>
            <p>City, State, ZIP</p>
            <p>Email: client@example.com</p>
          </div>
        </section>

        <table className="w-full mb-6 border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Item</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
              <th className="border border-gray-300 px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Service A</td>
              <td className="border border-gray-300 px-4 py-2">2</td>
              <td className="border border-gray-300 px-4 py-2">$50.00</td>
              <td className="border border-gray-300 px-4 py-2">$100.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Service B</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Service B</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Service B</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Service B</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Service B</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Service B</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Service B</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Service B</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Service B</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Service B</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Service B</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Service B</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Service B</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Service B</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Service B</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Service B</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Service B</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Service B</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Service B</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Service B</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Service B</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Service B</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
              <td className="border border-gray-300 px-4 py-2">$75.00</td>
            </tr>
          </tbody>
        </table>

        <div className="text-right mb-6">
          <p className="text-lg font-bold">Total: $175.00</p>
        </div>

        <footer className="text-center text-sm text-gray-600">
          <p>Thank you for your business!</p>
        </footer>
      </div>
      <div className="mt-4 text-center">
        <Button onClick={openPdfFile}>open Invoice</Button>
        <Button onClick={async () => await downloadPdfFile()}>
          Save Invoice
        </Button>
      </div>
    </div>
  );
}

export default InvoicePage;
