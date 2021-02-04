import React from "react"
import tw from "twin.macro"
import queryString from "query-string"
import { AiOutlineSearch } from "react-icons/ai"
import { navigate } from "gatsby"

const Search = ({ value, onChange, location }) => {
  const handlePress = (e) => {
    if (e.key === "Enter") {
      e.target.blur()
    }
  }

  const handleBlur = (e) => {
    const {
      query: { query },
    } = queryString.parseUrl(location.href)
    if (query !== value.trim())
      navigate(`?query=${value.trim()}`)
  }

  return (
    <>
      <div css={tw`my-4 p-4 w-full`}>
        <div css={tw`flex mb-2`}>
          <AiOutlineSearch size={16} css={tw`text-gray-500 my-auto w-8 h-8`} />
          <input
            css={tw`appearance-none focus:outline-none w-full ml-2 bg-transparent placeholder-gray-600`}
            style={{ border: "none", background: "transparent" }}
            placeholder={"검색어를 입력해주세요."}
            value={value}
            onChange={onChange}
            onKeyPress={handlePress}
            onBlur={handleBlur}
          />
        </div>
        <hr />
      </div>
    </>
  )
}

export default Search
