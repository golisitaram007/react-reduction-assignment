import React from 'react';
import { MdSearch } from 'react-icons/md';
import { Form, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPeers } from '../store/actions';
import { bindActionCreators } from 'redux';

const handleFormChange = (input, props) => {
  if( input !== "" ) {
    props.history.push('/search');
    props.getPeers(input);
  }
  return;
}

const handleSearchBtnClick = (e, props) => {
  const searchInput = document.getElementById('searchInput').value;
  handleFormChange(searchInput, props)
}
const handleForm = (e, props) => {
  e.preventDefault();
  const searchInput = e.currentTarget.elements.search.value;
  handleFormChange(searchInput, props)
}
const SearchInput = (props) => {
  return (
    <Form inline className="cr-search-form" onSubmit={e => handleForm(e, props)}>
      <MdSearch
        size="20"
        className="cr-search-form__icon-search text-secondary"
        onClick={(e) => handleSearchBtnClick(e, props)}
      />
      <Input
        type="search"
        id="searchInput"
        className="cr-search-form__input"
        placeholder="Search..."
        name="search"
      />
    </Form>
  );
};

const withRouterComp = withRouter(SearchInput)

const mapDispatchToProps = dispatch => bindActionCreators({ getPeers }, dispatch);
  
export default connect(null, mapDispatchToProps)(withRouterComp);
