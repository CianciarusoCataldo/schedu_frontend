
import React from "react";

// reactstrap components
import {

  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col

} from "reactstrap";


class Dashboard extends React.Component {


  render() {
    console.log(this.props.user+" DASHBOARD")

    return (
      <>
        <div className="content">
        <div className="slide-in">
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h3" style={{ textAlign: "center" }}><b>Dashboard</b></CardTitle>
                </CardHeader>
                <CardBody>
                </CardBody>
              </Card>
            </Col>
          </Row>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
