import {Model, ObjectId, Schema, model, models} from "mongoose";

interface FavoriteDocument {
  owner: ObjectId;
  items: ObjectId[];
}

const favoriteSchema = new Schema<FavoriteDocument>(
  {
    owner: {type: Schema.Types.ObjectId, ref: "User"},
    items: [{type: Schema.Types.ObjectId, ref: "Audio"}],
  },
  {timestamps: true}
);

export default model("Favorites", favoriteSchema) as Model<FavoriteDocument>;
