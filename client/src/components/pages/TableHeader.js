import React from "react";

export default function TableHeader() {
    return (
        <thead>
        <tr>
            <th>Full Name</th> {/* Зміна заголовка колонки */}
            <th>Title</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Created At</th> {/* Додаткова колонка: дата створення */}
        </tr>
        </thead>
    );
}
