const { Spanner } = require('@google-cloud/spanner');

class CloudSpannerClient {
  constructor(projectId, instanceId, databaseId) {
    this.spanner = new Spanner({ projectId });
    this.instance = this.spanner.instance(instanceId);
    this.database = this.instance.database(databaseId);
  }

  async queryData(query) {
    try {
      const response = await this.database.run(query);
      return response;
    } catch (error) {
      throw new Error();
    } finally {
      await this.database.close();
    }
  }

  async insertData(tableName, data) {
    const table = this.database.table(tableName);

    try {
      await table.insert([ data ]);
    } catch (error) {
      throw new Error();
    } finally {
      await this.database.close();
    }
  }
}

module.exports = CloudSpannerClient;