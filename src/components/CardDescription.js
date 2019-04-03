import React, { PureComponent } from 'react'
import { CardText } from 'reactstrap';
import { connect } from 'react-redux';
import { getCompInfo } from '../store/actions';
import { bindActionCreators } from 'redux';
import Loader from './Loader';

class CardDescription extends PureComponent {

    getCompInfo() {
        this.props.getCompInfo(this.props.peer);
    }
    componentDidMount() {
        this.getCompInfo();
    }

    componentDidUpdate() {
        this.getCompInfo();
    }

    render() {
        return (
            this.props.description ? <CardText><small>{ this.props.description }</small></CardText> : <Loader />
        )
    }
  
}
const mapStateToProps = (state, props) => ({
    description: state.companies[props.peer]
});

const mapDispatchToProps = dispatch => bindActionCreators({getCompInfo}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CardDescription);
