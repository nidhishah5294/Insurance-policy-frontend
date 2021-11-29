export interface InsurancePolicy {
    policy_number: number;
    policy_start_date: Date;
    policy_end_date: Date;
    policy_description: string;
    customer_first_name: string;
    customer_surname: string;
    customer_date_of_birth: Date
}