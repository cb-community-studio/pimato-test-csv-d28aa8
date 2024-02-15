    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'employee';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   userId: { type: Schema.Types.ObjectId, ref: "users" },
       first: { type: String, unique: false, lowercase: false, default: '' },
       last: { type: String, unique: false, lowercase: false, default: '' },
       employee: { type: String, unique: false, lowercase: false, default: '' },
       date: { type: Date },
       birth: { type: Date },
       gender: { type: Array , default: "[\"M\",\"F\"]" },
       phone: { type: String, unique: false, lowercase: false, default: '' },
       email: { type: String, unique: false, lowercase: false, default: '' },
       address: { type: String, unique: false, lowercase: false, default: '' },
       employment: { type: String, unique: false, lowercase: false, default: '' },
       status: { type: Boolean },
       hire: { type: Boolean },
       termination: { type: Boolean },
       job: { type: String, unique: false, lowercase: false, default: '' },

            
          },
          {
            timestamps: true
        });
      
        // This is necessary to avoid model compilation errors in watch mode
        // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };