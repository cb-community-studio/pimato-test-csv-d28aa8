    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'stores';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   storeName: { type: String, unique: false, lowercase: false, default: '' },
       address: { type: String, unique: false, lowercase: false, default: '' },
       phoneNumber: { type: String, unique: false, lowercase: false, default: '' },
       openingHours: { type: String, unique: false, lowercase: false, default: '' },
       menu: { type: String, unique: false, lowercase: false, default: '' },
       seatingCapacity: { type: String, unique: false, lowercase: false, default: '' },

            
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