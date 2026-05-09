import { useMemo, useState } from 'react';

const STORAGE_KEY = 'library-loan-books';

const initialBooks = [
  {
    id: 1,
    title: '클린 코드',
    author: '로버트 C. 마틴',
    category: '소프트웨어',
    description: '읽기 쉬운 코드를 작성하는 원칙을 다룬 개발 입문 필독서입니다.',
    borrowed: false,
  },
  {
    id: 2,
    title: '리액트를 다루는 기술',
    author: '김민준',
    category: '프론트엔드',
    description: 'React 컴포넌트와 상태 관리를 실습 중심으로 학습할 수 있습니다.',
    borrowed: true,
  },
  {
    id: 3,
    title: '모던 자바스크립트 Deep Dive',
    author: '이웅모',
    category: '프로그래밍',
    description: 'JavaScript 동작 원리와 문법을 깊이 있게 정리한 도서입니다.',
    borrowed: false,
  },
  {
    id: 4,
    title: '데이터베이스 개론',
    author: '김연희',
    category: '데이터베이스',
    description: '관계형 데이터베이스와 SQL의 기본 개념을 배울 수 있습니다.',
    borrowed: false,
  },
  {
    id: 5,
    title: 'AWS로 시작하는 클라우드',
    author: '박상현',
    category: '클라우드',
    description: 'AWS 기초 서비스와 배포 흐름을 이해하기 좋은 실습형 도서입니다.',
    borrowed: true,
  },
  {
    id: 6,
    title: 'UX/UI 디자인 입문',
    author: '정유진',
    category: '디자인',
    description: '사용자 중심 화면 설계와 인터페이스 구성 방법을 소개합니다.',
    borrowed: false,
  },
];

function loadBooks() {
  try {
    const savedBooks = localStorage.getItem(STORAGE_KEY);
    return savedBooks ? JSON.parse(savedBooks) : initialBooks;
  } catch {
    return initialBooks;
  }
}

function App() {
  const [books, setBooks] = useState(loadBooks);
  const [searchTerm, setSearchTerm] = useState('');

  // 도서 상태를 변경하고 localStorage에 저장합니다.
  const updateBooks = (nextBooks) => {
    setBooks(nextBooks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextBooks));
  };

  // 선택한 도서를 대출 또는 반납 상태로 바꿉니다.
  const toggleBorrow = (bookId) => {
    const nextBooks = books.map((book) =>
      book.id === bookId ? { ...book, borrowed: !book.borrowed } : book,
    );
    updateBooks(nextBooks);
  };

  // 제목, 저자, 분야 기준으로 도서를 검색합니다.
  const filteredBooks = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    if (!keyword) {
      return books;
    }

    return books.filter((book) =>
      `${book.title} ${book.author} ${book.category}`.toLowerCase().includes(keyword),
    );
  }, [books, searchTerm]);

  const borrowedBooks = books.filter((book) => book.borrowed);
  const availableCount = books.length - borrowedBooks.length;

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">React Library System</p>
          <h1>도서관 대출 관리 시스템</h1>
          <p className="hero-copy">
            도서 검색부터 대출, 반납, 현재 대출 현황까지 한 화면에서 관리하는 과제용
            React 웹시스템입니다.
          </p>
        </div>
        <div className="hero-panel" aria-label="대출 현황 요약">
          <span>현재 대출 중</span>
          <strong>{borrowedBooks.length}</strong>
          <small>권</small>
        </div>
      </section>

      <section className="summary-grid" aria-label="도서 통계">
        <article>
          <span>전체 도서</span>
          <strong>{books.length}</strong>
        </article>
        <article>
          <span>대출 가능</span>
          <strong>{availableCount}</strong>
        </article>
        <article>
          <span>대출 중</span>
          <strong>{borrowedBooks.length}</strong>
        </article>
      </section>

      <section className="toolbar">
        <div>
          <h2>도서 목록</h2>
          <p>제목, 저자, 분야를 검색해 원하는 책을 빠르게 찾을 수 있습니다.</p>
        </div>
        <label className="search-box">
          <span>검색</span>
          <input
            type="search"
            value={searchTerm}
            placeholder="예: React, AWS, 클린 코드"
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>
      </section>

      <section className="content-grid">
        <div className="book-list" aria-label="검색된 도서 목록">
          {filteredBooks.map((book) => (
            <article className="book-card" key={book.id}>
              <div className="book-card-header">
                <div>
                  <span className="category">{book.category}</span>
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
                </div>
                <span className={book.borrowed ? 'status borrowed' : 'status available'}>
                  {book.borrowed ? '대출 중' : '대출 가능'}
                </span>
              </div>
              <p className="description">{book.description}</p>
              <button type="button" onClick={() => toggleBorrow(book.id)}>
                {book.borrowed ? '반납하기' : '대출하기'}
              </button>
            </article>
          ))}
          {filteredBooks.length === 0 && (
            <div className="empty-state">
              <strong>검색 결과가 없습니다.</strong>
              <p>다른 제목, 저자, 분야로 다시 검색해 주세요.</p>
            </div>
          )}
        </div>

        <aside className="loan-panel" aria-label="현재 대출 현황">
          <h2>현재 대출 현황</h2>
          <div className="loan-items">
            {borrowedBooks.map((book) => (
              <div className="loan-item" key={book.id}>
                <span>{book.title}</span>
                <button type="button" onClick={() => toggleBorrow(book.id)}>
                  반납
                </button>
              </div>
            ))}
            {borrowedBooks.length === 0 && (
              <p className="no-loans">현재 대출 중인 도서가 없습니다.</p>
            )}
          </div>
        </aside>
      </section>
    </main>
  );
}

export default App;
