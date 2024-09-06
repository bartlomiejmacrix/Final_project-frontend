import React, { useState, useEffect } from "react";
import { format } from "date-fns";

const ContactForm = ({ contact, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    streetName: "",
    houseNumber: "",
    apartmentNumber: "",
    postalCode: "",
    town: "",
    phoneNumber: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    if (contact) {
      setFormData({
        firstName: contact.firstName || "",
        lastName: contact.lastName || "",
        streetName: contact.streetName || "",
        houseNumber: contact.houseNumber || "",
        apartmentNumber: contact.apartmentNumber || "",
        postalCode: contact.postalCode || "",
        town: contact.town || "",
        phoneNumber: contact.phoneNumber || "",
        dateOfBirth: contact.dateOfBirth || "",
      });
    }
  }, [contact]);

  const calculateAge = (dateOfBirth) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const url = contact
        ? `https://localhost:7158/api/customer/${contact.id}`
        : "https://localhost:7158/api/customer";

      const method = contact ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const savedContact = await response.json();
        onSave(savedContact);
      } else {
        console.error("Error saving contact");
      }
    } catch (error) {
      console.error("There was an error saving the contact:", error);
    }
  };

  const handleCancel = () => {
    if (contact) {
      setFormData({
        firstName: contact.firstName || "",
        lastName: contact.lastName || "",
        streetName: contact.streetName || "",
        houseNumber: contact.houseNumber || "",
        apartmentNumber: contact.apartmentNumber || "",
        postalCode: contact.postalCode || "",
        town: contact.town || "",
        phoneNumber: contact.phoneNumber || "",
        dateOfBirth: contact.dateOfBirth || "",
      });
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        streetName: "",
        houseNumber: "",
        apartmentNumber: "",
        postalCode: "",
        town: "",
        phoneNumber: "",
        dateOfBirth: "",
      });
    }
  };

  return (
    <div className="mx-auto w-1/2 rounded-lg border p-4 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">
        {contact ? "Edit Contact" : "New Contact"}
      </h2>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label>Street Name</label>
          <input
            type="text"
            name="streetName"
            value={formData.streetName}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label>House Number</label>
          <input
            type="text"
            name="houseNumber"
            value={formData.houseNumber}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label>Apartment Number</label>
          <input
            type="text"
            name="apartmentNumber"
            value={formData.apartmentNumber}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label>Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label>Town</label>
          <input
            type="text"
            name="town"
            value={formData.town}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div>
          <label>Age</label>
          <input
            type="text"
            value={
              formData.dateOfBirth ? calculateAge(formData.dateOfBirth) : ""
            }
            readOnly
            className="w-full rounded-lg border bg-gray-100 p-2"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <button
          className="rounded-lg bg-gray-500 px-4 py-2 text-white"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="rounded-lg bg-blue-500 px-4 py-2 text-white"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
