import { Document, FilterQuery, Model, QueryOptions, UpdateQuery } from 'mongoose';

export abstract class Repository<T extends Document> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    public async find(filter: FilterQuery<T> = {}) {
        return this.model.find(filter);
    }

    public async findOne(filter: FilterQuery<T>) {
        return this.model.findOne(filter);
    }

    public async create(data: Partial<T>) {
        return this.model.create(data as any);
    }

    public async updateOne(
        filter: FilterQuery<T>,
        update: UpdateQuery<T>,
        options: QueryOptions = { new: true, runValidators: true, context: 'query' }
    ) {
        return this.model.findOneAndUpdate(filter, update, options);
    }

    public async deleteOne(filter: FilterQuery<T>) {
        return this.model.findOneAndDelete(filter);
    }
}
