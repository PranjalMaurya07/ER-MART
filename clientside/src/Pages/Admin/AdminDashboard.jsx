import React from "react";
import Layout from "../../Components/Layouts/layout";
import AdminMenu from "../../Components/Layouts/adminMenu";
import { useAuth } from "../../Context/auth";
import "../../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="admin-dashboard-container container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="admin-info-card card w-75 p-3">
              <h3 className="admin-info-title">Admin Name: {auth?.user?.name}</h3>
              <h3 className="admin-info-email">Admin Email: {auth?.user?.email}</h3>
              <h3 className="admin-info-contact">Admin Contact: {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
