import React from 'react';
const AdminHeading = ({ content, level = 2, align = 'left' }) => {
  const Tag = `h${level}`;
  return <Tag style={{ textAlign: align }} className="font-bold">{content}</Tag>;
};

export default AdminHeading;
