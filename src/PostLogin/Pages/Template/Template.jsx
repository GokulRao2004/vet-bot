import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ManageTemplate } from "../../Components/ManageTemplate/ManageTemplate";
import { CreateTemplate } from '../../Components/CreateTemplate/CreateTemplate';

export const Template = () => {
    const location = useLocation();
    const [isEditing, setIsEditing] = useState(false);
    const [templateId, setTemplateId] = useState(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get('id');

        if (id) {
            setIsEditing(true);
            setTemplateId(id);
        } else {
            setIsEditing(false);
            setTemplateId(null);
        }
    }, [location.search]);

    return (
        <div>
          {
            isEditing?(<CreateTemplate/>):(<ManageTemplate />)
          }
            
        </div>
    );
};
