import React from "react";
import { Link } from "react-router-dom";

export const InternalLink = ({ to, title }) => <Link to={to}>{title}</Link>;
