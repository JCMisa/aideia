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
      <DataTable
        columns={columns}
        data={consultationsList ?? []}
        showCreate={user.role === "admin"}
        currentUserRole={user.role}
      />
    </div>
  );
};

export default ConsultationsList;
