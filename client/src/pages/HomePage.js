import React, { useEffect, useState } from "react";
import { DatePicker, Form, Input, Modal, Select, Table, message } from "antd";
import Header from "../component/Layout/Header";
import Footer from "../component/Layout/Footer";
import {UnorderedListOutlined,AreaChartOutlined} from "@ant-design/icons";
//import "./index.css";  
import axios from "axios";
import Spinner from "./../component/Spinner";
import moment from "moment";
import Analytics from "../component/Analytics";

const { RangePicker } = DatePicker;

const HomePage = () => {

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData,setViewData]=useState("table");

  //table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },

    // {
    //   title: "Refrence",
    //   dataIndex: "refrence",
    // },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Actions",
    },
  ];

  //getall transection

  //useEffect Hook
  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post(
          "http://localhost:8080/api/v1/transection/get-transection",
          { userid: user._id, frequency, selectedDate, type }
        );
        setLoading(false);
        setAllTransection(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
        message.error("Fetch Issue With Transection");
      }
    };
    getAllTransactions();
  }, [frequency, selectedDate, type]);

  //form handling

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      await axios.post(
        "http://localhost:8080/api/v1/transection/add-transection",
        { ...values, userid: user._id }
      );
      setLoading(false);
      message.success("Transaction Added Successfully");
    } catch (error) {
      setLoading(false);
      message.error("Failed to Add Transection");
    }
  };

  return (
    <>
      <Header />
      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h5>Select Frequency</h5>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedate(values)}
            />
          )}
        </div>
        <div>
          <h5>Select Type</h5>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedate(values)}
            />
          )}
        </div>
        <div className="switch-icons">
             <UnorderedListOutlined className={`mx-2 ${viewData==='table' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData("table")} />
             <AreaChartOutlined className={`mx-2 ${viewData==='analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData("analytics")} />
          </div>
        <div>
        
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            
            Add New
          </button>
        </div>
      </div>
      <div className="content">
        {viewData==='table' ?  <Table
          columns={columns}
          dataSource={allTransection.map((item, index) => ({
            ...item,
            key: index,
          }))}
        />:<Analytics allTransection={allTransection}/> }
        {/* <Table columns={columns}  dataSource={allTransection} /> */}
        {/* <Table
          columns={columns}
          dataSource={allTransection.map((item, index) => ({
            ...item,
            key: index,
          }))}
        /> */}
      </div>
      <Modal
        title="Add Transection"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Amount" name="amount">
            <Input type="text" />
          </Form.Item>

          <Form.Item label="type" name="type">
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">Tax</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
{/* 
          <Form.Item label="Refrence" name="refrence">
            <Input type="text" />
          </Form.Item> */}

          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>

          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
      <Footer />
    </>
  );
};

export default HomePage;
