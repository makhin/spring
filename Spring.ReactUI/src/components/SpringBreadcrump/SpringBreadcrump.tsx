import React from "react";
import {Breadcrumb, BreadcrumbItem, Container} from "reactstrap";

class SpringBreadcrump extends React.Component<any, any> {
    render() {
        return (
            <Breadcrumb>
                <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
                <BreadcrumbItem><a href="#">Library</a></BreadcrumbItem>
                <BreadcrumbItem active>Data</BreadcrumbItem>
            </Breadcrumb>
        );
    }
}

export default SpringBreadcrump;