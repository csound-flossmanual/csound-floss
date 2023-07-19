import React from "react";
import { ReactLink } from "react-router-dom";
import { Link } from "@chakra-ui/react";

export const InternalLink = ({ to, title }) => (
  <Link as={ReactLink} to={to} color="linkColor">
    {title}
  </Link>
);
