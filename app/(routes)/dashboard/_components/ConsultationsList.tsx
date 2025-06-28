import EmptyState from "@/components/custom/EmptyState";
import { columns } from "@/components/data-table/consultations/consultations-column";
import { DataTable } from "@/components/data-table/consultations/consultations-data-table";
import { Button } from "@/components/ui/button";

const ConsultationsList = ({
  user,
  consultationsList,
}: {
  user: UserType;
  consultationsList: ConsultationType[];
}) => {
  return (
    <div className="w-full flex flex-col space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h1 className="text-4xl font-bold">Consultations List</h1>
        <Button className="cursor-pointer">+ New Consultation</Button>
      </div>
      <div>
        {consultationsList.length === 0 ? (
          <EmptyState
            icon="https://cdn-icons-png.flaticon.com/512/9233/9233346.png"
            title="No Consultations Yet"
            description="It looks like you haven't had any consultations with our AI doctor yet. When you do, they'll show up here!"
            action="+ Start a Consultation"
            link=""
          />
        ) : (
          <DataTable
            columns={columns}
            data={consultationsList ?? []}
            showCreate={user.role === "admin"}
            currentUserRole={user.role}
          />
        )}
      </div>
    </div>
  );
};

export default ConsultationsList;
