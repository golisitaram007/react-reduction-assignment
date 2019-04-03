import React from 'react';
import { MdSearch } from 'react-icons/md';
import { Form, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { getPeers } from '../store/actions';
import { bindActionCreators } from 'redux';

const handleFormChange = (input, props) => {
  input !== "" && props.getPeers(input);
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


const mapDispatchToProps = dispatch => bindActionCreators({getPeers}, dispatch);
  
export default connect(null, mapDispatchToProps)(SearchInput);
