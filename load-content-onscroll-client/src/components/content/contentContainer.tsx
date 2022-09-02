import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { apiUrl } from "../../connections/apiUrl";
import { LoadComponent } from "../loadComponent/loadComponent";
import './content.css';
import { ContentItem } from "./contentItem";

type GetData = [{
  value: string,
  index: number
}];
  
const getAllData: () => Promise<GetData> = async () => {
    let response = await fetch(`${apiUrl}/all-data`);
    let resData = await response.json() as GetData;
    return resData;
}

const getLimitedData: (start: number, count: number) => Promise<GetData> = async (start, count) => {
  let response = await fetch(`${apiUrl}/limited-data`, {
    method: 'POST',
    body: JSON.stringify({
      startIndex: start,
      countItems: count
    }),
    headers: {
      'content-type': 'application/json'
    }
  });
  let resData = await response.json() as GetData;
  return resData;
}

const visibleWindowHeight = window.innerHeight;
const fullWindowHeight = document.body.offsetHeight;

export const ContentContainer:React.FC = () => {
  const [currentData, setCurrentData] = useState<GetData>();
  const [visibleItems, setVisibleItems] = useState<number>(3);
  const {status, error, data, refetch, isLoading} = useQuery<GetData, Error>(['data', visibleItems], () => getLimitedData(visibleItems - 3, 3), {
    refetchOnWindowFocus: false,
    enabled: false
  });

    
  window.onscroll = e => {
    let currentPosition = window.scrollY + visibleWindowHeight;
    let treshhold = fullWindowHeight - visibleWindowHeight / 4
    if(currentPosition >= treshhold && visibleItems * 400 < currentPosition) {
      setVisibleItems(visibleItems + 3);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      refetch();
    }, 0);
  }, [])

  useEffect(() => {
    if(currentData && data){
      //@ts-ignore
      setCurrentData([...currentData, ...data])
    } else if (data) {
      setCurrentData(data)
    }
  }, [data])

  useEffect(() => {
    refetch()
  }, [visibleItems])

  if(status === 'error') {
    return <div>
      {error.message}
    </div>
  }

  return <div className="content-container">
    {currentData?.map((value, index) => {
      if(index < visibleItems)
          return <ContentItem 
              key={value.value + index}
              value={value.value}
          />
      return null;
    })}
    {isLoading && <LoadComponent />}
  </div>
}