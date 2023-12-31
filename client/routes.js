import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import OrganizationWrapper from "./components/organization-wrapper";
import withRouteProps from "./utils/with-route-props";

class OrganizationRoutes extends React.Component {
  render() {
    const {organizations, params} = this.props;
    if (params["*"] === "" && organizations.length > 0) {
      return <Navigate to={`/${organizations[0].slug}/`} />;
    }
    return (
      <Routes>
        <Route path="/:organization/*" element={<OrganizationWrapper />} />
      </Routes>
    );
  }
}

const mapStateToProps = (state) => ({
  organizations: state.organizations,
});
OrganizationRoutes.defaultProps = {
  organizations: [],
};

OrganizationRoutes.propTypes = {
  params: PropTypes.object.isRequired,
  organizations: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
    }),
  ),
};

export default connect(
  mapStateToProps,
  null,
)(withRouteProps(OrganizationRoutes));
