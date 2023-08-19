/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import {copy, linkIcon, loader, tick} from '../assets'
import { useLazyGetSummaryQuery } from "../service/article"
const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    article: ""
  })

  const [allArticles, setAllArticles] = useState([])
  const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery()
  const [copied, setCopied] = useState("")
  useEffect(() => {
    const articlesFromLocal = JSON.parse(
      localStorage.getItem('articles')
    )
    if (articlesFromLocal) {
      setAllArticles(articlesFromLocal)
    }
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {data} = await getSummary({articleUrl: article.url})
    if(data?.summary) {
      const newArticle  = {...article, summary: data.summary}
      const updateAllArticles = [newArticle, ...allArticles]
      setArticle(newArticle)
      setAllArticles(updateAllArticles)
      console.log(newArticle)
      localStorage.setItem('articles', JSON.stringify(updateAllArticles))
    }
  }
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl)
    navigator.clipboard.writeText(copyUrl)
    setTimeout(() => setCopied(false),3000)
  }
  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2"> 
          <form className="relative flex 
          justify-center items-center"
            onSubmit={handleSubmit}
          > 
            <img src={linkIcon}
            alt="link-icon"
            className="absolute left-0 my-2 ml-3 w-5"/>

            <input type="url" placeholder="Enter a url"
            value={article.url} 
            onChange={(e) => {setArticle({...article, url: e.target.value})}}
            required className="url_input peer"/>

            <button type="submit" className="submit_btn peer-focus:border-gray-700 
            peer-focus:text-grey-700">
              +
            </button>
          </form>
          {/*browser history*/}
          <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
            {allArticles.map((item, index) => (
            <div key={`link-${index}`}
            onClick={() => setArticle(item)}
            className="link_card">
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img src={copied === item.url ? tick : copy} 
                alt="copy-icon"
                className="w-[40%] h-[40%] object-contain"/>
              </div>
              <p className="flex-1 text-blue-700 font-medium text-sm truncate">
                  {item.url}</p>

            </div>
            ))}
          </div>
      </div>
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain"/>
        ) : error ? 
        (<p className="font-inter font-bold text-black">
          Error
          <br/>
        <span className="font-inter font-bold text-black"> {error?.data?.error}</span>
        </p> 
        ) 
        : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-bold">
                Summary
              </h2>
              <div className="summary_box">
                <p>{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default Demo