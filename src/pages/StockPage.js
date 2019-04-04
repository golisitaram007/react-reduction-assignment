import React, { PureComponent } from 'react'
import Page from 'components/Page';
import { Card, CardBody, CardHeader, Col, Row, Table, Form, Label, Input, FormGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { getStockPrice } from '../store/actions';
import { bindActionCreators } from 'redux';
import Loader from '../components/Loader';

const InputOptions = ({periods}) => {
    return periods.map((e, i) => <option key={i}>{e}</option>)
}
class StockPage extends PureComponent {
  
  state = {
      period: '1m',
      stockquote: '',
      tabHeaders: ['Date', 'Close']
  }
  handleChange = (e) => {
      this.setState({
          period: e.currentTarget.value
      }, () => {
          this.getStockPrice();
      });
  }
  getStockPrice() {
    const { stockquote, period } = this.state;
    this.props.getStockPrice(stockquote, period);
  }

  static getDerivedStateFromProps(props, state) {
      return {
        stockquote: props.match.params.stockquote
      }
  }
  componentDidMount() {
    this.getStockPrice();
  }
  render() {
    const { stockquote } = this.state;
    return (
        <Page title={'Stock Price: ' + stockquote } breadcrumbs={[{ name: `Stock Price ${stockquote}`, active: true }]}>
            <Row>
                <Col>
                    <Card className="mb-3">
                        <CardHeader>
                            Stock Price
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col>
                                    <Card body>
                                        <Form>
                                            <FormGroup>
                                                <Label for="exampleSelect">Select Period</Label>
                                                <Input type="select" name="select" value={this.state.period} onChange={this.handleChange}>
                                                    <InputOptions periods={this.props.periods}/>
                                                </Input>
                                            </FormGroup>
                                        </Form>
                                    </Card>
                                </Col>

                                <Col>
                                    <Card body>
                                    {
                                        this.props.stockPrice.length ? 
                                            <Table dark>
                                                <thead>
                                                    <tr>
                                                        {
                                                            this.state.tabHeaders.map((th, i) => <th key={i}>{ th }</th>)
                                                        }
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.props.stockPrice.map((tr, i) => (
                                                            <tr key={i}>
                                                                <td>{ tr.date }</td>
                                                                <td>{ tr.close }</td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </Table>
                                            :
                                            <Loader />
                                        }
                                    </Card>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Page>
    )
  }
}

const mapStateToProps = (state) => ({
    periods: state.periods,
    stockPrice: state.stockPrice
});

const mapDispatchToProps = dispatch => bindActionCreators({getStockPrice}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StockPage);
