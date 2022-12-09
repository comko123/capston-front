import { Link } from "react-router-dom"

const BorderSearchContentList = ({data=[],search}) => 
{return(<>{!data.length?<div className="noData">
<h4 className="noContent">{search} 에대한 결과가 없습니다.</h4></div>
:data.map((item,index)=>{
return (<div className="list_area" key={index}>
<h3 className="border_nickname">{item.title}</h3>
<div className="list"><Link className="list_link"
to={`/detail/${index}/comment/${item.id}`}>{item.content}
</Link></div><div className="borderHR"/></div>)})}</>)}
export default BorderSearchContentList