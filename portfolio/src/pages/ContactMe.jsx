import HeadingWithMenu from "../components/HeadingWintMenu";
import Container from "../components/Container";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearAllMessageErrors, resetMessage, sendMessage } from "../store/slices/message.slice";

const ContactMe = () => {
  const [senderName, setSenderName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const { error, resmessage ,loading} = useSelector((state) => state.message);

  const handleSubmitForm = (formData) => {
    dispatch(sendMessage(formData));
    
  };

  const handleContact = () => {
    const formData = new FormData();
    formData.append("senderName", senderName);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message);

    handleSubmitForm(formData);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllMessageErrors())
    }

    if (resmessage) {
      toast.success(resmessage);
      dispatch(resetMessage())
      setSenderName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }
  }, [dispatch, error,message,loading]);

  return (
    <Container>
      <div className="flex flex-col flex-1 w-full h-full">
        <HeadingWithMenu heading={"Contact"} />
        <div className="flex flex-col gap-20 xl:gap-12 flex-1 justify-between ">
          <div className="text-3xl">Feel Free To Contact Me.</div>
          <div className="w-full flex flex-col justify-center items-center gap-4">
            <div className="w-full text-xl">
              <label htmlFor="name">Name *</label>
              <input
                value={senderName}
                name="name"
                type="text"
                className="w-full bg-transparent border border-x-0 border-t-0 outline-none"
                placeholder=""
                required
                onChange={(e) => setSenderName(e.target.value)}
              />
            </div>
            <div className="w-full text-xl">
              <label htmlFor="email">Email *</label>
              <input
                value={email}
                name="email"
                type="email"
                className="w-full bg-transparent border border-x-0 border-t-0 outline-none"
                placeholder=""
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full text-xl">
              <label htmlFor="subject">Subject *</label>
              <input
                value={subject}
                type="text"
                name="subject"
                className="w-full bg-transparent border border-x-0 border-t-0 outline-none"
                placeholder=""
                required
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="w-full text-xl">
              <label htmlFor="message">Message *</label>
              <textarea
                value={message}
                type="text"
                name="message"
                className="w-full h-32 bg-transparent border border-x-0 border-t-0 outline-none"
                placeholder=""
                required
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
          <button
            onClick={handleContact}
            className="bg-themeprimary text-xl font-semibold text-commonwhitetwo px-4 py-3 rounded-lg flex items-center gap-3 hover:text-commonblack hover:bg-commonwhite border border-themeprimary mx-auto"
          >
            Submit
          </button>
         
        </div>
      </div>
    </Container>


  );
};

export default ContactMe;
