import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  getGames('US').then(any => {
    res.status(200).send({
      games: any
    })
  })
})

export const epicfreegames = router

export interface EpicGamesInterface {
  games: {
      id: number
      title: string
      offerType: string
      mainImage: string
      originalPrice: string
      description: string
      productSlug: string
      urlSlug: string
      startDate: string,
      endDate: string
  }
}

export const getGames = async (country: string) => {
  if (!country) {
      throw new Error('Country is required')
  }

  const games = await fetch(
    "https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?country=" + country
  ).then((response) => response.json())

  return await filter(games);
}


async function filter(data: any) {
  const gamesObj = await data?.data?.Catalog?.searchStore?.elements;

  const filteredGames = await gamesObj?.filter(
      (filteredObj: { offerType: string; promotions: { promotionalOffers: string | any[]; upcomingPromotionalOffers: string | any[]; }; }) =>
          filteredObj?.offerType === "BASE_GAME" &&
          filteredObj?.promotions?.promotionalOffers?.length !== 0 &&
          Date.parse(
              filteredObj?.promotions?.promotionalOffers[0].promotionalOffers[0]?.startDate
          ) < Date.now()
  )

  if (await filteredGames.length > 0) {
      return filteredGames.map((game: any) => {
          return <EpicGamesInterface["games"]> {
              id: game.id,
              title: game.title,
              description: game.description,
              mainImage: game.keyImages[1].url ?? game.keyImages[1].url,
              urlSlug: game.catalogNs.mappings[game.catalogNs.mappings.length - 1].urlSlug,
          }
      })
  }

  return [];
}