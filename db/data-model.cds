namespace my.usecase;
abstract entity mrid {
    key mRID: UUID;
}

entity A : mrid {
	B : composition of many B on B.A = $self;
	content: String;
}

entity B : mrid {
	A: Association to one A;
	content: String;
	C: composition of many C on C.B = $self;
}

entity C : mrid {
	B: Association to one B;
	content: String;
}
