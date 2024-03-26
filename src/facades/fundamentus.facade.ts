const axios = require('axios')
const cheerio = require('cheerio')
import { StockData } from "src/models"

export class FundamentusService {
  public async getAllStocks(): Promise<StockData[]> {
    try {
      const url = 'https://www.fundamentus.com.br/resultado.php'
      const stock_filtered: StockData[] = []

      await axios(url).then(async response => {
        const html = response.data
        const $ = cheerio.load(html)

        $('tr', html).each(async function (this: any) {
          const title = $(this).find('span').attr('title')

          //importa o dado 2 e 15 16
          let data = $(this).text()
          data = data.split("\n")

          const ticker = data[1].replace(/(\r\n\t|\n|\r|\t|%)/gm, "");
          const p_l = data[3].replace(/(\r\n\t|\n|\r|\t|%)/gm, "");
          const div_yield = data[6].replace(/(\r\n\t|\n|\r|\t|%)/gm, "");
          const roic = data[16].replace(/(\r\n\t|\n|\r|\t|%)/gm, "");
          const roe = data[17].replace(/(\r\n\t|\n|\r|\t|%)/gm, "");
          const ev_ebit = data[11].replace(/(\r\n\t|\n|\r|\t|%)/gm, "");

          let liq = data[18].replace(/(\r\n\t|\n|\r|\t|%)/gm, "");
          liq = parseFloat(liq.replaceAll(".", "").replace(",", "."))

          let plFinal = parseFloat(p_l.replaceAll(".", "").replace(",", "."))

          if (Number(liq) >= 1000000 && plFinal > 0) {
            const item: StockData = {
              title: title.replace(/(\r\n\t|\n|\r|\t|%)/gm, ""),
              ticker: ticker,
              div_yield: parseFloat(div_yield.replaceAll(".", "").replace(",", ".")),
              p_l: parseFloat(p_l.replaceAll(".", "").replace(",", ".")),
              roe: parseFloat(roe.replaceAll(".", "").replace(",", ".")),
              roic: parseFloat(roic.replaceAll(".", "").replace(",", ".")),
              ev_ebit: parseFloat(ev_ebit.replaceAll(".", "").replace(",", "."))
            }
            stock_filtered.push(item)
          }
        })
      }).catch(err => console.log(err))

      return stock_filtered
    }
    catch (err) {
      console.log(err)
      throw err
    }
  }
}