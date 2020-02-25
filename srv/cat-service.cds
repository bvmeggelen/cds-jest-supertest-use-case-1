using my.usecase as api from '../db/data-model';

service CatalogService {
	entity A as projection on api.A;
}
