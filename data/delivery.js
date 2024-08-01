export const delVer=[{
id:'1',
deliveryDays: 7,
priceCents: 0



},
{
    id:'2',
    deliveryDays: 3,
    priceCents: 499
    
    
    
    },{
        id:'3',
        deliveryDays: 1,
        priceCents: 999
        
        
        
        }];
export function getDelverOption(delVerOp)
{
   let delverOps;
   delVer.forEach((item)=>{
       {
             if(item.id ===delVerOp)
                delverOps=item;

       }


   });
   return delverOps;


}        