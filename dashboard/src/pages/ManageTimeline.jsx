import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  clearAllTimelineErrors,
  deleteTimeline,
  getAllTimeline,
  resetTimelineSlice,
} from "@/strore/slices/timelineSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";

const ManageTimeline = () => {
  const { timeline, loading, error, message } = useSelector(
    (state) => state.timeline
  );
  const [timelineId, setTimelineId] = useState("");
  const dispatch = useDispatch();

  const handleDeleteTimeline = (id) => {
    setTimelineId(id);
    dispatch(deleteTimeline(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice());
      dispatch(getAllTimeline());
    }
  }, [dispatch, error, loading, message]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Tabs>
        <TabsContent>
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Timeline</CardTitle>
              <Link to={"/"}>
                <Button>Return To Dashboard</Button>
              </Link>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {timeline && timeline.length > 0 ? (
                    timeline.map((element) => (
                      <TableRow key={element._id} className="bg-accent">
                        <TableCell className="font-medium ">
                          {element.title}
                        </TableCell>
                        <TableCell className="md:table-cell">
                          {element.description}
                        </TableCell>
                        <TableCell className="md:table-cell">
                          {element.type}
                        </TableCell>
                        <TableCell className="md:table-cell">
                          {element.timeline.from}
                        </TableCell>
                        <TableCell className="md:table-cell ">
                          {element.timeline.to}
                        </TableCell>
                        <TableCell className="md:table-cell text-right">
                          {loading && timelineId === element._id ? (
                            <SpecialLoadingButton content={"Deleting..."} />
                          ) : (
                            <Button
                              onClick={() => handleDeleteTimeline(element._id)}
                              variant="destructive"
                            >
                              Delete
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="text-3xl overflow-y-hidden">
                      <TableCell>You have not added any timeline</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageTimeline;
