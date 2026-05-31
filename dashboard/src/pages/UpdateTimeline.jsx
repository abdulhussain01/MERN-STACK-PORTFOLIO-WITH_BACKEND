import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useEffect, useState } from "react";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllTimelineErrors,
  getAllTimeline,
  resetTimelineSlice,
  updateTimeline,
} from "@/strore/slices/timelineSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";

const UpdateTimeline = () => {
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, error, message } = useSelector((state) => state.timeline);

  const handleUpdateTimeline = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("company", company);
    formData.append("jobTitle", jobTitle);
    formData.append("description", description);
    formData.append("type", type);
    formData.append("from", from);
    formData.append("to", to);

    dispatch(updateTimeline(id, formData));
  };

  useEffect(() => {
    const getTimeline = async () => {
      await axios
        .get(`${import.meta.env.VITE_BACKENDURL}/timeline/get/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setCompany(res.data.timeline.company);
          setJobTitle(res.data.timeline.jobTitle);
          setDescription(res.data.timeline.description);
          setType(res.data.timeline.type);
          setFrom(res.data.timeline.timeline.from);
          setTo(res.data.timeline.timeline.to);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    getTimeline();

    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline());
    }
  }, [id, message, error]);

  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  return (
    <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
      <form
        action=""
        onSubmit={handleUpdateTimeline}
        className="w-[100%] px-5 md:w-[650px]"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="flex flex-col gap-2 items-start justify-between sm:items-center sm:flex-row">
              <h2 className="font-semibold leading-7 text-gray-900 text-3xl">
                UPDATE TIMELINE
              </h2>
              <Button onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </div>
            <div className="mt-10 flex flex-col gap-5">
              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Company Or Education Institute
                </Label>
                <div className="mt-2 ">
                  <div className="flex rounded-md shadow-sm ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                    <input
                      type="text"
                      placeholder="Company Or Education Institute Name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

               <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                    Role Title
                </Label>
                <div className="mt-2 ">
                  <div className="flex rounded-md shadow-sm ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                    <input
                      type="text"
                      placeholder="Job role"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Timeline Type
                </Label>
                <div className="mt-2 ">
                  <div className="flex rounded-md shadow-sm ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                    <Select
                      value={type}
                      onValueChange={(selectValue) => setType(selectValue)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Timeline Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Work">Work</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </Label>
                <div className="mt-2 ">
                  <div className="flex rounded-md shadow-sm ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 ">
                    <Textarea
                      type="text"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 h-[300px] bg-gray-50"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  From
                </Label>
                <div className="mt-2 ">
                  <div className="flex rounded-md shadow-sm ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                    <input
                      type="number"
                      placeholder="Starting Period"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full sm:col-span-4">
                <Label className="block text-sm font-medium leading-6 text-gray-900">
                  To
                </Label>
                <div className="mt-2 ">
                  <div className="flex rounded-md shadow-sm ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                    <input
                      type="number"
                      placeholder="Ending Period"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            {loading ? (
              <SpecialLoadingButton content={"Updating ..."} />
            ) : (
              <Button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-52"
              >
                Update Timeline
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateTimeline;
