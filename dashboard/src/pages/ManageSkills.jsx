import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent } from "@/components/ui/tabs";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  clearAllskillErrors,
  deleteskill,
  getAllSkill,
  resetskillSlice,
  updateskill,
} from "@/strore/slices/skillSlice";
import { Tooltip, TooltipContent } from "@/components/ui/tooltip";
import { TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ManageSkills = () => {
  const { skill, loading, error, message } = useSelector(
    (state) => state.skill
  );
  const [newProficiency, setNewProficency] = useState("");
  

  const dispatch = useDispatch();

  const handleInputChange = (proficiency) => {
    setNewProficency(proficiency);
  };
  const handleUpdateSkill = (id) => {
    dispatch(updateskill(id,newProficiency))
  };
  const handleDeleteSkill = (id) => {
    dispatch(deleteskill(id))
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllskillErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetskillSlice());
      dispatch(getAllSkill());
    }
  }, [dispatch, error, loading, message]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Tabs>
        <TabsContent>
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Skills</CardTitle>
              <Link to={"/"}>
                <Button>Return To Dashboard</Button>
              </Link>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-4">
              {skill && skill.length > 0 ? (
                skill.map((element) => (
                  <Card key={element._id}>
                    <CardHeader className="text-3xl font-bold items-center justify-between flex-row ">
                      {element.title}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Trash2
                              onClick={() => handleDeleteSkill(element._id)}
                              className="h-5 w-5 hover:text-red-500 cursor-pointer"
                            ></Trash2>
                          </TooltipTrigger>
                          <TooltipContent side="right" style={{ color: "red" }}>
                            Delete
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardHeader>
                    <CardFooter className>
                      <Label className="text-2xl mr-2">Proficiency</Label>
                      <Input
                        type="number"
                        defaultValue={element.proficiency}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onBlur={()=>handleUpdateSkill(element._id)}
                      />
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <CardTitle className="text-3xl overflow-y-hidden">
                You have not added any skills!
                </CardTitle>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageSkills;
