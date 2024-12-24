import "./CompanyCard.css";
import {Company} from "../../../Models/Company";
import {Card, Paper} from "@mui/material";

interface CompanyCardProps {
    company?: Company,
}


export function CompanyCard(props: CompanyCardProps): JSX.Element {
    return (
        <div className="CompanyCard">
            <Card elevation={3}>
                <p><strong>ID: </strong>{props.company?.id}</p>
                <p><strong>Company Name: </strong>{props.company?.name}</p>
                <p><strong>Email: </strong>{props.company?.email}</p>
            </Card>
        </div>
    );
}
