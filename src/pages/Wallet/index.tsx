import { useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Table, message, Space, Button, Popconfirm, Row, Col } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import Logo from "../../assets/wallet.svg";
import api from "../../services/api";
import { Form, ContainerUpper, ContainerLogout } from "./styles";
import { useEffect } from "react";
import { isAuthenticated, logout } from "../../services/auth";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

interface ICreateInvestment {
  investment_type: string;
  date: string;
  value: number;
}

interface IInvesmentResponse extends ICreateInvestment {
  id: string;
  user_id: string;
}

interface IPieChart {
  name: string;
  value: number;
  fill: string;
}

export const Invesment: React.FC = () => {
  const [investment, setInvestment] = useState<ICreateInvestment>({
    date: "",
    value: 0,
    investment_type: "",
  });

  let history = useHistory();

  const [investmentList, setInvestmentList] = useState([
    {
      id: "",
      value: 0,
      date: "",
      user_id: "",
      investment_type: "",
    },
  ]);

  const [state, setState] = useState({ error: "" });

  const [pieChartData, setPieChartData] = useState<IPieChart[]>([
    {},
  ] as IPieChart[]);

  useEffect(() => {
    if (!isAuthenticated()) {
      history.push("/");
    }
    if (!investmentList[0].id) {
      handleListInvestments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreateInvestment = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setState({
      error: "",
    });
    const { date, value, investment_type } = investment;
    if (!date || !value || !investment_type) {
      setState({
        error: "Preencha data, valor e tipo de investimento para continuar!",
      });
    } else {
      try {
        await api.post("/investments", {
          date,
          value,
          investment_type,
        });
        setState({
          error: "",
        });
        message.info("Investimento cadastrado com sucesso!");
        handleListInvestments();
      } catch (err) {
        setState({
          error:
            "Houve um problema ao cadastrar seu investimento, tente novamente",
        });
      }
    }
  };

  const handleListInvestments = async () => {
    try {
      const investments: IInvesmentResponse[] = (
        await api.get("/users/investments")
      ).data;
      if (investments.length > 0) {
        setInvestmentList(investments);
      }
      const chartData = processPieCharData([...investments]);
      setPieChartData(chartData);
      setState({
        error: "",
      });
    } catch (err) {
      setState({
        error:
          "Houve um problema ao recuperar seus investimentos cadastrados, tente novamente",
      });
    }
  };

  const handleDeleteInvestment = async (id: string) => {
    try {
      await api.delete(`/users/investments/${id}`);
      setState({
        error: "",
      });
      handleListInvestments();
    } catch (err) {
      setState({
        error: "Houve um problema ao deletar seu investimento, tente novamente",
      });
    }
  };

  const columns = [
    {
      title: "Data",
      key: "Data",
      dataIndex: "Data",
      align: "center" as "center",
      render: (text: React.ReactNode, record: IInvesmentResponse) => (
        <>{record.date.slice(0, 10)}</>
      ),
    },
    {
      title: "Valor (R$)",
      key: "Value",
      dataIndex: "Value",
      align: "center" as "center",
      render: (text: React.ReactNode, record: IInvesmentResponse) => (
        <>{record.value}</>
      ),
    },
    {
      title: "Investimento",
      key: "investment",
      dataIndex: "investment",
      align: "center" as "center",
      render: (text: React.ReactNode, record: IInvesmentResponse) => (
        <>{record.investment_type}</>
      ),
    },
    {
      title: "",
      dataIndex: "action",
      render: (text: React.ReactNode, record: IInvesmentResponse) => (
        <Space>
          <Popconfirm
            placement="top"
            title="Are you sure you want to delete this alert?"
            onConfirm={() => handleDeleteInvestment(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="default" style={{ margin: "0 8px" }}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const processPieCharData = (
    investments: IInvesmentResponse[]
  ): IPieChart[] => {
    let totalFixa: number = 0;
    let totalVariavel: number = 0;
    for (const invest of investments) {
      if (invest.investment_type === "RENDA FIXA") {
        totalFixa += Number(invest.value);
      } else {
        totalVariavel += Number(invest.value);
      }
    }
    return [
      { name: "RENDA FIXA", value: totalFixa, fill: "#57c0e8" },
      { name: "RENDA VARIAVEL", value: totalVariavel, fill: "#FF6565" },
    ] as IPieChart[];
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div>
      <ContainerLogout>
        <Button
          type="primary"
          danger
          size="large"
          icon={<PoweroffOutlined />}
          onClick={() => {
            logout();
            history.push("/");
          }}
        >
          Logout
        </Button>
      </ContainerLogout>
      <ContainerUpper>
        <h2>Carteira de investimentos</h2>
        <Form onSubmit={handleCreateInvestment}>
          <img src={Logo} alt="Wallet Invest logo" />
          {state.error && <p>{state.error}</p>}
          <select
            id="invest"
            onChange={(e) =>
              setInvestment({
                ...investment,
                investment_type: e.target.value,
              })
            }
          >
            <option value="RENDA VARIAVEL">RENDA VARIAVEL</option>
            <option value="RENDA FIXA">RENDA FIXA</option>
            <option value="" selected disabled hidden>
              Selecione o tipo de investimento
            </option>
          </select>
          <input
            type="number"
            placeholder="Investimento em R$"
            onChange={(e) =>
              setInvestment({ ...investment, value: Number(e.target.value) })
            }
          />
          <input
            type="date"
            placeholder="Data da transação"
            onChange={(e) =>
              setInvestment({
                ...investment,
                date: e.target.value,
              })
            }
          />
          <button type="submit">Cadastrar</button>
        </Form>
      </ContainerUpper>
      <div>
        <div>
          <Row>
            <Col span={12}>
              {investmentList[0].id ? (
                <Table
                  columns={columns}
                  dataSource={[...investmentList]}
                  rowKey={(record) => record.id}
                  key={`item${investmentList.length}`}
                  size="small"
                  tableLayout="fixed"
                  style={{ paddingTop: 40 }}
                ></Table>
              ) : (
                <div>
                  <h2>Por Favor cadastre investimentos!</h2>
                </div>
              )}
            </Col>
            <Col span={12}>
              <ResponsiveContainer width="95%" height={400}>
                <PieChart width={450} height={400}>
                  {console.log(JSON.stringify(pieChartData))}
                  {console.log(typeof pieChartData[0].value)}
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={pieChartData}
                    outerRadius={150}
                    label={renderCustomizedLabel}
                    labelLine={false}
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Invesment);
