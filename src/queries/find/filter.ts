import { IDynamoDbManager } from "../../interfaces/iDynamodbManager";
import { Execute } from "./execute";
import { Limit } from "./limit";
import { Using } from './using';
import { Order } from "./order";
import { Resume } from "./resume";

export class Filter
{
    constructor(private manager:IDynamoDbManager, 
                private type:{new(...args: any[])}, 
                private keyParams:{keyConditions:string, expressionAttributeValues?:object, expressionAttributeNames?:object},
                private filterParams:{filterExpression?:string, expressionAttributeValues?:object, expressionAttributeNames?:object},
                private params:{projections?:string[]})
    {

    }

    limit(limit:number): Limit
    {
        return new Limit(this.manager, this.type, this.keyParams, this.filterParams, this.params, limit);
    }
    
    using(indexName:string): Using
    {
        return new Using(this.manager, this.type, this.keyParams, this.filterParams, this.params, indexName);
    }
    
    order(forward:boolean): Order
    {
        return new Order(this.manager, this.type, this.keyParams, this.filterParams, this.params, forward);
    }    
    
    resume(key:string): Resume
    {
        return new Resume(this.manager, this.type, this.keyParams, this.filterParams, this.params, key);
    }

    async execute<T extends object>(): Promise<{items:T[], lastEvaluatedKey:string}>
    {
        return await new Execute(this.manager, this.type, this.keyParams, this.filterParams, this.params).execute();
    }
}