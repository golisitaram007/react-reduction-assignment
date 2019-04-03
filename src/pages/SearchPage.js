import React from 'react';
import Page from 'components/Page';
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    CardText,
    Col,
    Row,
} from 'reactstrap';
import { connect } from 'react-redux';
import CardDescription from '../components/CardDescription';

const getStockPrice = (card, props) => {
    props.history.push(`/stock/${card}`);
}

const cardTheme = ['', 'top', 'left', 'right'];

const color = () => {
    const rand = cardTheme[Math.floor(Math.random() * cardTheme.length)];
    return `${!!rand ? '-' : ''}${rand}`
}
const SearchPage = (props) => {
  return (
    <Page title="Search" breadcrumbs={[{ name: 'search', active: true }]}>
        {
            props.peers.length ? 
                <Row>
                    {
                        props.peers.map((cardTitle, index) => (
                            
                            <Col key={index} md={4} sm={4} xs={12} className="mb-3">
                                <Card
                                    inverse
                                    className={`border-0 cardStyle bg-gradient-theme${color()}`}
                                    style={{
                                        height: 300,
                                    }}
                                >
                                <CardBody className="d-flex flex-column justify-content-start align-items-start">
                                    <CardTitle>{ cardTitle }</CardTitle>
                                    <CardDescription peer={cardTitle}/>
                                </CardBody>

                                <CardBody className="d-flex justify-content-between align-items-center">
                                    <CardText></CardText>
                                    <Button outline color="light" onClick={(e) => getStockPrice(cardTitle, props)}>
                                        Click
                                    </Button>
                                </CardBody>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
               :
               <Row>
                   <CardBody className="d-flex flex-column justify-content-start align-items-start">
                        <CardText>No Content</CardText>
                    </CardBody>
               </Row>

        }
        
    </Page>
  )
}

const mapStateToProps = state => ({
    peers: state.peers
});

export default connect(mapStateToProps)(SearchPage);