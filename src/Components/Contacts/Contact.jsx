import { IoIosPerson } from "react-icons/io";

const Contact = ({ contactInfo, onClick, isSelected }) => {
  var contactStyles;
  if (isSelected) {
    contactStyles =
      "w-full my-1 cursor-pointer rounded-lg p-2 bg-blue-300 bg-blue-100";
  } else {
    contactStyles =
      "w-full my-1 cursor-pointer rounded-lg p-2 transition-all duration-200 hover:bg-blue-100";
  }
  return (
    <div className={contactStyles} onClick={onClick}>
      <div className="flex h-[70px] items-center">
        {contactInfo.image ? (
          <img
            src={`data:image/jpeg;base64,${contactInfo.image}`}
            alt="Contact image"
            className="h-[60px] w-[60px] rounded-full object-cover"
          />
        ) : (
          <IoIosPerson size={50} />
        )}
        <div className="flex w-3/4 flex-col justify-center pl-4 text-sm">
          <p className="w-full font-bold">
            {contactInfo.firstName} {contactInfo.lastName}
          </p>
          <p className="text-gray-500">
            {contactInfo.phoneNumber} {contactInfo.town}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
