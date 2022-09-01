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
  
const getData: () => Promise<GetData> = async () => {
    let response = await fetch(`${apiUrl}/data`);
    let resData = await response.json() as GetData;
    return resData;
}

const visibleWindowHeight = window.innerHeight;
const fullWindowHeight = document.body.offsetHeight;

export const ContentContainer:React.FC = () => {
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const [visibleItems, setVisibleItems] = useState<number>(3);
    const {status, error, data, refetch} = useQuery<GetData, Error>('data', () => getData(), {
        refetchOnWindowFocus: false,
        enabled: false
      });

      
      window.onscroll = e => {
        let currentPosition = window.scrollY + visibleWindowHeight;
        let treshhold = fullWindowHeight - visibleWindowHeight / 4
        if(currentPosition >= treshhold && visibleItems * 400 < currentPosition) {
            setShowLoading(true);
            setTimeout(() => {
                setVisibleItems(visibleItems + 2);
                setShowLoading(false)                
            }, 1000);
            console.log(122)
        }
      }
    
      useEffect(() => {
        setTimeout(() => {
          refetch();
        }, 0);
      }, [])
      

      if(status === 'loading') {
        return <div className="content-container">
            <LoadComponent />
        </div>
      }
    
      if(status === 'error') {
        return <div>
          {error.message}
        </div>
      }
    
      if(status === 'success') {
        return <div className="content-container">
          {data?.map((value, index) => {
            if(index < visibleItems)
                return <ContentItem 
                    key={value.value + index}
                    value={value.value}
                />
          })}
          {showLoading && <LoadComponent />}
        </div>
      }

    return <div className="content-container">
        nothing yet
    </div>
}