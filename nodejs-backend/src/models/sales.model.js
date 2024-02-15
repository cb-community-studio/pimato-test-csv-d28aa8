    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'sales';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   transactionId: { type: String, unique: false, lowercase: false, default: '' },
       date: { type: String, unique: false, lowercase: false, default: '' },
       time: { type: String, unique: false, lowercase: false, default: '' },
       registerCashierId: { type: String, unique: false, lowercase: false, default: '' },
       customerId: { type: String, unique: false, lowercase: false, default: '' },
       itemsSold: { type: String, unique: false, lowercase: false, default: '' },
       totalSaleAmount: { type: String, unique: false, lowercase: false, default: '' },
       discounts: { type: String, unique: false, lowercase: false, default: '' },
       taxes: { type: String, unique: false, lowercase: false, default: '' },
       netSaleAmount: { type: String, unique: false, lowercase: false, default: '' },

            
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