import React, { useState, useEffect } from "react";

const defaultValues = {
  firstName: "",
  lastName: "",
  streetName: "",
  houseNumber: "",
  apartmentNumber: "",
  postalCode: "",
  town: "",
  phoneNumber: "",
  dateOfBirth: "",
};

const ContactForm = ({ contact, onContactSelect }) => {
  const [formData, setFormData] = useState({
    ...defaultValues,
  });

  if (contact) {
    var defaultContactValues = {
      firstName: contact.firstName || "",
      lastName: contact.lastName || "",
      streetName: contact.streetName || "",
      houseNumber: contact.houseNumber || "",
      apartmentNumber: contact.apartmentNumber || "",
      postalCode: contact.postalCode || "",
      town: contact.town || "",
      phoneNumber: contact.phoneNumber || "",
      dateOfBirth: contact.dateOfBirth || "",
    };
  }

  useEffect(() => {
    if (contact) {
      setFormData({ ...defaultContactValues });
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

  const handleSave = async (e) => {
    e.preventDefault();
    console.log(formData);
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
        onContactSelect(savedContact);
      } else {
        console.error("Error saving contact");
      }
    } catch (error) {
      console.error("There was an error saving the contact:", error);
    }
  };

  const handleCancel = () => {
    if (contact) {
      setFormData({ ...defaultContactValues });
    } else {
      setFormData({ ...defaultValues });
    }
  };

  return (
    <div className="mx-auto mt-16 w-1/2 rounded-lg p-4">
      <h2 className="mb-4 border-b border-b-blue-500 pb-6 text-2xl font-bold">
        {contact ? "Edit Contact" : "New Contact"}
      </h2>
      <form onSubmit={(e) => handleSave(e)}>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full rounded-lg border p-2"
              required
              minLength={2}
              maxLength={50}
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "First name must be between 2 and 50 characters.",
                )
              }
              onInput={(e) => e.target.setCustomValidity("")}
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
              required
              minLength={2}
              maxLength={50}
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Last name must be between 2 and 50 characters.",
                )
              }
              onInput={(e) => e.target.setCustomValidity("")}
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
              required
              minLength={2}
              maxLength={50}
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Street name must be between 2 and 50 characters.",
                )
              }
              onInput={(e) => e.target.setCustomValidity("")}
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
              required
              minLength={1}
              maxLength={10}
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "House number must be between 1 and 10 characters.",
                )
              }
              onInput={(e) => e.target.setCustomValidity("")}
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
              maxLength={10}
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Apartment number cannot be longer than 10 characters.",
                )
              }
              onInput={(e) => e.target.setCustomValidity("")}
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
              required
              pattern="\d{2}-\d{3}"
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Postal code must be in the format XX-XXX.",
                )
              }
              onInput={(e) => e.target.setCustomValidity("")}
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
              required
              minLength={2}
              maxLength={50}
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  "Town name must be between 2 and 50 characters.",
                )
              }
              onInput={(e) => e.target.setCustomValidity("")}
            />
          </div>

          <div>
            <label>Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full rounded-lg border p-2"
              required
              pattern="[0-9]{9}"
              onInvalid={(e) =>
                e.target.setCustomValidity("Phone number is not valid.")
              }
              onInput={(e) => e.target.setCustomValidity("")}
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
              required
              onInvalid={(e) =>
                e.target.setCustomValidity("Date of birth must be in the past.")
              }
              onInput={(e) => {
                const selectedDate = new Date(e.target.value);
                const today = new Date();

                if (selectedDate >= today) {
                  e.target.setCustomValidity(
                    "Date of birth must be in the past.",
                  );
                } else {
                  e.target.setCustomValidity("");
                }
              }}
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
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
